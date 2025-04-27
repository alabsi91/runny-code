package apiAuth

import (
	"net/http"
	"runny-code/common"
)

func LoginHandle(w http.ResponseWriter, r *http.Request) {
	pass := r.FormValue("password")
	user := r.FormValue("username")

	if pass != common.Password_Env || user != common.Username_Env {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:     "session",
		Value:    common.SessionToken,
		Path:     "/",
		HttpOnly: true,
	})
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Login successful"))
}
