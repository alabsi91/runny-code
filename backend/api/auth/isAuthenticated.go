package apiAuth

import (
	"net/http"
	"runny-code/common"
)

func IsAuthenticatedHandle(w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie("session")
	if err != nil {
		http.Error(w, "Unauthorized: No session cookie", http.StatusUnauthorized)
		return
	}

	if !isValidSession(cookie.Value) {
		http.Error(w, "Unauthorized: Invalid session", http.StatusUnauthorized)
		return
	}

	w.Write([]byte("Authenticated"))
}

func isValidSession(token string) bool {
	return token == common.SessionToken
}
