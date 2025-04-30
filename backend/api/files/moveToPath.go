package apiFiles

import (
	"net/http"
	"path"
	"runny-code/common"
)

func MoveToPathHandle(w http.ResponseWriter, r *http.Request) {
	fromPath := r.URL.Query().Get("fromPath")
	toPath := r.URL.Query().Get("toPath")
	if fromPath == "" {
		http.Error(w, "Missing from path parameter", http.StatusBadRequest)
		return
	}
	if toPath == "" {
		http.Error(w, "Missing to path parameter", http.StatusBadRequest)
		return
	}

	fromPath = path.Join(common.FilesDir, fromPath)
	toPath = path.Join(common.FilesDir, toPath)

	err := moveToPath(fromPath, toPath)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}
