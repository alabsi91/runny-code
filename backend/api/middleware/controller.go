package apiMiddleware

import "net/http"

func Controller(next http.Handler) http.Handler {
	return CorsMiddleware(authMiddleware(next))
}
