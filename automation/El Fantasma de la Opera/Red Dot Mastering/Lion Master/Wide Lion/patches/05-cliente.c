#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>
#include <arpa/inet.h>
#include <openssl/ssl.h>
#include <openssl/err.h>
#include <openssl/aes.h>
#include <sys/stat.h>

#define PORT 65432
#define BUFFER_SIZE 1024
#define AES_KEY "01234567890123456789012345678901" // Clave AES de 256 bits
#define AUTH_KEY "my_secret_key" // Clave de autenticación

// Función para cifrar datos usando AES-256
void aes_encrypt(const unsigned char *input, unsigned char *output, size_t length) {
    AES_KEY encrypt_key;
    AES_set_encrypt_key((const unsigned char *)AES_KEY, 256, &encrypt_key);

    for (size_t i = 0; i < length; i += AES_BLOCK_SIZE) {
        AES_encrypt(input + i, output + i, &encrypt_key);
    }
}

// Función para validar si un archivo es de audio
int is_audio_file(const char *filename) {
    const char *audio_extensions[] = {".mp3", ".wav", ".aac", ".flac", ".ogg"};
    size_t num_extensions = sizeof(audio_extensions) / sizeof(audio_extensions[0]);

    for (size_t i = 0; i < num_extensions; i++) {
        if (strstr(filename, audio_extensions[i]) != NULL) {
            return 1;
        }
    }
    return 0;
}

// Inicializar contexto SSL
SSL_CTX* initialize_ssl_context() {
    SSL_CTX *ctx;

    // Inicializar bibliotecas de OpenSSL
    SSL_library_init();
    OpenSSL_add_all_algorithms();
    SSL_load_error_strings();

    // Crear un contexto SSL/TLS
    ctx = SSL_CTX_new(TLS_client_method());
    if (!ctx) {
        perror("Error al crear el contexto SSL");
        exit(EXIT_FAILURE);
    }

    return ctx;
}

int main() {
    int sock = 0;
    struct sockaddr_in serv_addr;
    char filename[BUFFER_SIZE];
    char buffer[BUFFER_SIZE] = {0};
    unsigned char encrypted_data[BUFFER_SIZE] = {0};

    // Inicializar SSL
    SSL_CTX *ctx = initialize_ssl_context();
    SSL *ssl;

    // Crear socket
    if ((sock = socket(AF_INET, SOCK_STREAM, 0)) < 0) {
        perror("Error al crear el socket");
        exit(EXIT_FAILURE);
    }

    // Configurar la dirección del servidor
    serv_addr.sin_family = AF_INET;
    serv_addr.sin_port = htons(PORT);

    if (inet_pton(AF_INET, "127.0.0.1", &serv_addr.sin_addr) <= 0) {
        perror("Dirección inválida o no soportada");
        close(sock);
        SSL_CTX_free(ctx);
        exit(EXIT_FAILURE);
    }

    // Conectar al servidor
    if (connect(sock, (struct sockaddr *)&serv_addr, sizeof(serv_addr)) < 0) {
        perror("Error al conectar con el servidor");
        close(sock);
        SSL_CTX_free(ctx);
        exit(EXIT_FAILURE);
    }

    // Crear una conexión SSL
    ssl = SSL_new(ctx);
    SSL_set_fd(ssl, sock);

    if (SSL_connect(ssl) <= 0) {
        ERR_print_errors_fp(stderr);
        close(sock);
        SSL_CTX_free(ctx);
        exit(EXIT_FAILURE);
    }

    printf("Conexión SSL/TLS establecida con el servidor.\n");

    // Enviar clave de autenticación
    SSL_write(ssl, AUTH_KEY, strlen(AUTH_KEY));

    // Solicitar nombre del archivo
    printf("Ingrese el nombre del archivo a transferir: ");
    fgets(filename, BUFFER_SIZE, stdin);
    filename[strcspn(filename, "\n")] = '\0'; // Eliminar salto de línea

    // Verificar si es un archivo de audio
    if (is_audio_file(filename)) {
        printf("Error: No se permite subir archivos de audio.\n");
        SSL_shutdown(ssl);
        SSL_free(ssl);
        close(sock);
        SSL_CTX_free(ctx);
        return 1;
    }

    // Abrir el archivo local
    FILE *file = fopen(filename, "r");
    if (file == NULL) {
        perror("Error al abrir el archivo");
        SSL_shutdown(ssl);
        SSL_free(ssl);
        close(sock);
        SSL_CTX_free(ctx);
        return 1;
    }

    // Obtener el tamaño del archivo
    struct stat st;
    if (stat(filename, &st) == 0 && st.st_size > 1048576) { // 1 MB
        printf("Error: El archivo es demasiado grande.\n");
        fclose(file);
        SSL_shutdown(ssl);
        SSL_free(ssl);
        close(sock);
        SSL_CTX_free(ctx);
        return 1;
    }

    // Enviar el nombre del archivo al servidor
    SSL_write(ssl, filename, strlen(filename));
    printf("Nombre del archivo enviado: %s\n", filename);

    // Leer y enviar el contenido cifrado del archivo
    size_t bytes_read;
    memset(buffer, 0, BUFFER_SIZE);
    while ((bytes_read = fread(buffer, 1, BUFFER_SIZE, file)) > 0) {
        aes_encrypt((unsigned char *)buffer, encrypted_data, bytes_read);
        SSL_write(ssl, encrypted_data, bytes_read);
        memset(buffer, 0, BUFFER_SIZE);
    }

    fclose(file);

    // Recibir respuesta del servidor
    memset(buffer, 0, BUFFER_SIZE);
    SSL_read(ssl, buffer, BUFFER_SIZE);
    printf("Respuesta del servidor: %s\n", buffer);

    // Cerrar la conexión SSL
    SSL_shutdown(ssl);
    SSL_free(ssl);
    close(sock);
    SSL_CTX_free(ctx);
    return 0;
}
