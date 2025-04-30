package apiFiles

import (
	"net/http"
	"path"
	"runny-code/common"
)

func CreateFolderHandle(w http.ResponseWriter, r *http.Request) {
	whereToCreate := r.URL.Query().Get("directory")
	if whereToCreate == "" {
		http.Error(w, "Missing 'whereToCreate' parameter", http.StatusBadRequest)
		return
	}
	
	createdPath, err := createFolder(path.Join(common.FilesDir, whereToCreate))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(createdPath))
}
