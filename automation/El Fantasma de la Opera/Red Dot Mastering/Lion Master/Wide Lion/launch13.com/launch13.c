#include <stdio.h>
#include <stdlib.h>
#include <event2/event.h>
#include <event2/bufferevent.h>
#include <event2/listener.h>

// Definimos una estructura para almacenar los datos de contexto del cliente
struct client_context {
    struct event_base *base;
    struct bufferevent *client_bev;
    struct bufferevent *server_bev;
};

// Función de callback para manejar los eventos de lectura y escritura del cliente
void client_read_cb(struct bufferevent *bev, void *ctx) {
    struct client_context *client_ctx = (struct client_context *)ctx;
    struct evbuffer *input = bufferevent_get_input(bev);
    struct evbuffer *output = bufferevent_get_output(client_ctx->server_bev);
    evbuffer_add_buffer(output, input);
}

void client_event_cb(struct bufferevent *bev, short events, void *ctx) {
    struct client_context *client_ctx = (struct client_context *)ctx;
    if (events & BEV_EVENT_ERROR) {
        perror("Error en el cliente");
    }
    bufferevent_free(client_ctx->client_bev);
    bufferevent_free(client_ctx->server_bev);
    free(client_ctx);
}

// Función de callback para manejar las conexiones entrantes
void accept_conn_cb(struct evconnlistener *listener, evutil_socket_t fd, struct sockaddr *address, int socklen, void *ctx) {
    struct event_base *base = evconnlistener_get_base(listener);
    struct bufferevent *client_bev = bufferevent_socket_new(base, fd, BEV_OPT_CLOSE_ON_FREE);
    struct client_context *client_ctx = (struct client_context *)malloc(sizeof(struct client_context));
    client_ctx->base = base;
    client_ctx->client_bev = client_bev;

    // Establecer una conexión al servidor de destino
    struct sockaddr_in dest_addr;
    evutil_parse_sockaddr_port("127.0.0.1:8080", (struct sockaddr *)&dest_addr, &socklen);
    struct bufferevent *server_bev = bufferevent_socket_new(base, -1, BEV_OPT_CLOSE_ON_FREE);
    bufferevent_socket_connect(server_bev, (struct sockaddr *)&dest_addr, sizeof(dest_addr));
    client_ctx->server_bev = server_bev;

    // Configurar los callbacks para el cliente y el servidor
    bufferevent_setcb(client_bev, client_read_cb, NULL, client_event_cb, client_ctx);
    bufferevent_enable(client_bev, EV_READ | EV_WRITE);
}

int main() {
    struct event_base *base = event_base_new();
    struct sockaddr_in sin;
    struct evconnlistener *listener;
    int port = 8888;

    if (!base) {
        fprintf(stderr, "No se pudo inicializar el bucle de eventos.\n");
        return 1;
    }

    sin.sin_family = AF_INET;
    sin.sin_addr.s_addr = htonl(INADDR_ANY);
    sin.sin_port = htons(port);

    listener = evconnlistener_new_bind(base, accept_conn_cb, NULL, LEV_OPT_CLOSE_ON_FREE | LEV_OPT_REUSEABLE, -1, (struct sockaddr *)&sin, sizeof(sin));
    if (!listener) {
        perror("No se pudo crear el listener");
        return 1;
    }

    event_base_dispatch(base);

    evconnlistener_free(listener);
    event_base_free(base);

    return 0;
}
