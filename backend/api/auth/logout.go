package apiAuth

import "net/http"

func LogoutHandle(w http.ResponseWriter, r *http.Request) {
	http.SetCookie(w, &http.Cookie{
		Name:   "session",
		Value:  "",
		Path:   "/",
		MaxAge: -1,
	})

	w.Write([]byte("Logged out"))
}