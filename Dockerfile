FROM golang:1.24-alpine AS builder

WORKDIR /build-dir

COPY ./backend/go.mod ./backend/go.sum ./
RUN go mod download && go mod verify

COPY ./backend/ ./
RUN go build -a -gcflags=all="-l -B" -ldflags="-w -s" -o "./runny-code"

FROM alpine:3.13

LABEL version="1.0"
LABEL description="Runny Code"
LABEL org.opencontainers.image.authors="alabsi91"

WORKDIR /runny-code

RUN apk update && apk add --no-cache shadow && \
    echo "**** create abc user and make our folders ****" && \
    groupmod -g 1000 users && \
    useradd -u 911 -U -d /config -s /bin/false abc && \
    usermod -G users abc && \
    echo "**** cleanup ****" && \
    rm -rf /tmp/*

COPY ./webui/dist ./webui/dist

WORKDIR /runny-code/backend

COPY --from=builder /build-dir/runny-code ./

CMD ["/bin/sh", "-c", "PUID=${PUID:-911} PGID=${PGID:-911} && [[ -z ${LSIO_READ_ONLY_FS} ]] && [[ -z ${LSIO_NON_ROOT_USER} ]] && { groupmod -o -g \"$PGID\" abc; usermod -o -u \"$PUID\" abc; } && exec su abc -s /bin/sh -c \"./runny-code\""]