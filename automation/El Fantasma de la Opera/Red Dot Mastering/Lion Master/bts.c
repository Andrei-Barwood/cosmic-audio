#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <string.h>

#define SERVER_IP "192.168.1.1"
#define CLIENT_IP "192.168.1.2"
#define SERVER_PORT 3000
#define CLIENT_PORT 3001

int main() {
    int server_socket, client_socket;
    struct sockaddr_in server_addr, client_addr;
    socklen_t addr_len = sizeof(struct sockaddr_in);
    char buffer[1024] = {0};

    // Crear socket TCP para el servidor
    if ((server_socket = socket(AF_INET, SOCK_STREAM, 0)) == 0) {
        perror("Socket creation failed");
        exit(EXIT_FAILURE);
    }

    // Configurar dirección del servidor
    server_addr.sin_family = AF_INET;
    server_addr.sin_addr.s_addr = inet_addr(SERVER_IP);
    server_addr.sin_port = htons(SERVER_PORT);

    // Enlazar el socket a la dirección y puerto del servidor
    if (bind(server_socket, (struct sockaddr *)&server_addr, sizeof(server_addr)) < 0) {
        perror("Bind failed");
        exit(EXIT_FAILURE);
    }

    // Escucha activa en las conexiones entrantes
    if (listen(server_socket, 3) < 0) {
        perror("Listen failed");
        exit(EXIT_FAILURE);
    }

    // Aceptar la conexión entrante del cliente
    if ((client_socket = accept(server_socket, (struct sockaddr *)&client_addr, &addr_len)) < 0) {
        perror("Accept failed");
        exit(EXIT_FAILURE);
    }

    // Leer la solicitud de conexión del cliente
    read(client_socket, buffer, sizeof(buffer));
    printf("Cliente: %s\n", buffer);

    // Enviar respuesta de conexión al cliente
    char *server_response = "Conexión PPP establecida";
    send(client_socket, server_response, strlen(server_response), 0);
    printf("Servidor: %s\n", server_response);

    // Cerrar sockets
    close(client_socket);
    close(server_socket);

    return 0;
}
