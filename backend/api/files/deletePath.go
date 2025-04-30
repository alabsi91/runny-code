package apiFiles

import (
	"net/http"
	"path"
	"runny-code/common"
)

func DeletePathHandle(w http.ResponseWriter, r *http.Request) {
	pathToDelete := r.URL.Query().Get("path")
	if pathToDelete == "" {
		http.Error(w, "Missing 'path' parameter", http.StatusBadRequest)
		return
	}
	
	err := deletePath(path.Join(common.FilesDir, pathToDelete))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}
