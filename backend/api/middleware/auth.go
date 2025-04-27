package apiMiddleware

import (
	"net/http"
	"runny-code/common"
)

func authMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		publicRoutes := map[string]bool{
			"/login":            true,
			"/logout":           true,
			"/is-authenticated": true,
			"/auth/":            true, // web page
		}

		if publicRoutes[r.URL.Path] {
			next.ServeHTTP(w, r)
			return
		}

		// Allow paths that start with website prefixes
		websitePrefixes := []string{"/sources/", "/assets/"}
		for _, prefix := range websitePrefixes {
			if len(r.URL.Path) >= len(prefix) && r.URL.Path[:len(prefix)] == prefix {
				next.ServeHTTP(w, r)
				return
			}
		}

		cookie, err := r.Cookie("session")
		if err != nil || !isValidSession(cookie.Value) {
			// Redirect to /auth/ only if the request is to /
			if r.URL.Path == "/" {
				http.Redirect(w, r, "/auth/", http.StatusFound)
				return
			}

			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func isValidSession(token string) bool {
	return token == common.SessionToken
}
