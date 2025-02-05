#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>
#include <arpa/inet.h>
#include <openssl/ssl.h>
#include <openssl/err.h>

#define PORT 65432
#define BUFFER_SIZE 1024
#define PROHIBITED_FOLDER "AI Music Generator"
#define STORAGE_FOLDER "05-youtubeContentID.js"
#define MAX_FILE_SIZE 1  // 1 byte
#define AUTH_KEY "my_secret_key" // Clave de autenticación

// Inicialización de SSL
SSL_CTX* initialize_ssl_context() {
    SSL_CTX *ctx;

    // Inicializar bibliotecas de OpenSSL
    SSL_library_init();
    OpenSSL_add_all_algorithms();
    SSL_load_error_strings();

    // Crear un contexto SSL/TLS
    ctx = SSL_CTX_new(TLS_server_method());
    if (!ctx) {
        perror("Error al crear el contexto SSL");
        exit(EXIT_FAILURE);
    }

    // Cargar certificado y clave privada
    if (SSL_CTX_use_certificate_file(ctx, "server.crt", SSL_FILETYPE_PEM) <= 0) {
        perror("Error al cargar el certificado");
        exit(EXIT_FAILURE);
    }
    if (SSL_CTX_use_PrivateKey_file(ctx, "server.key", SSL_FILETYPE_PEM) <= 0) {
        perror("Error al cargar la clave privada");
        exit(EXIT_FAILURE);
    }

    // Verificar la clave privada
    if (!SSL_CTX_check_private_key(ctx)) {
        perror("La clave privada no coincide con el certificado público");
        exit(EXIT_FAILURE);
    }

    return ctx;
}

int main() {
    int server_fd, client_fd;
    struct sockaddr_in address;
    int addrlen = sizeof(address);
    char buffer[BUFFER_SIZE] = {0};

    // Inicializar SSL
    SSL_CTX *ctx = initialize_ssl_context();

    // Crear socket
    if ((server_fd = socket(AF_INET, SOCK_STREAM, 0)) == 0) {
        perror("Error al crear el socket");
        exit(EXIT_FAILURE);
    }

    // Configurar la dirección
    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;
    address.sin_port = htons(PORT);

    // Enlazar el socket
    if (bind(server_fd, (struct sockaddr *)&address, sizeof(address)) < 0) {
        perror("Error al enlazar el socket");
        close(server_fd);
        exit(EXIT_FAILURE);
    }

    // Escuchar conexiones
    if (listen(server_fd, 3) < 0) {
        perror("Error en listen");
        close(server_fd);
        exit(EXIT_FAILURE);
    }

    printf("Servidor SSL/TLS escuchando en el puerto %d...\n", PORT);

    // Aceptar conexiones
    while (1) {
        if ((client_fd = accept(server_fd, (struct sockaddr *)&address, (socklen_t *)&addrlen)) < 0) {
            perror("Error en accept");
            close(server_fd);
            exit(EXIT_FAILURE);
        }

        // Crear una nueva conexión SSL para el cliente
        SSL *ssl = SSL_new(ctx);
        SSL_set_fd(ssl, client_fd);

        if (SSL_accept(ssl) <= 0) {
            ERR_print_errors_fp(stderr);
            close(client_fd);
            continue;
        }

        printf("Conexión segura establecida con un cliente.\n");

        // Recibir clave de autenticación
        memset(buffer, 0, BUFFER_SIZE);
        SSL_read(ssl, buffer, BUFFER_SIZE);
        if (strcmp(buffer, AUTH_KEY) != 0) {
            const char *response = "DENIED: Autenticación fallida.";
            SSL_write(ssl, response, strlen(response));
            SSL_shutdown(ssl);
            SSL_free(ssl);
            close(client_fd);
            continue;
        }

        printf("Autenticación exitosa.\n");

        // Recibir nombre del archivo
        memset(buffer, 0, BUFFER_SIZE);
        SSL_read(ssl, buffer, BUFFER_SIZE);
        printf("Nombre de archivo recibido: %s\n", buffer);

        // Rechazar archivos prohibidos (implementar validaciones adicionales aquí)
        if (strncmp(buffer, PROHIBITED_FOLDER, strlen(PROHIBITED_FOLDER)) == 0) {
            const char *response = "DENIED: Archivo en carpeta prohibida.";
            SSL_write(ssl, response, strlen(response));
            SSL_shutdown(ssl);
            SSL_free(ssl);
            close(client_fd);
            continue;
        }

        // Crear el archivo localmente
        char filepath[BUFFER_SIZE];
        snprintf(filepath, BUFFER_SIZE, "%s%s", STORAGE_FOLDER, buffer);
        FILE *file = fopen(filepath, "w");
        if (!file) {
            perror("Error al abrir el archivo");
            SSL_shutdown(ssl);
            SSL_free(ssl);
            close(client_fd);
            continue;
        }

        // Recibir contenido del archivo
        size_t bytes_read;
        while ((bytes_read = SSL_read(ssl, buffer, BUFFER_SIZE)) > 0) {
            fwrite(buffer, 1, bytes_read, file);
        }
        fclose(file);

        // Confirmación
        const char *response = "ACCEPTED: Archivo almacenado.";
        SSL_write(ssl, response, strlen(response));

        // Cerrar la conexión SSL
        SSL_shutdown(ssl);
        SSL_free(ssl);
        close(client_fd);
    }

    close(server_fd);
    SSL_CTX_free(ctx);
    return 0;
}
