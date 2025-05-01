package apiFiles

import (
	"net/http"
	"path"
	"runny-code/common"
)

func CreateFileHandle(w http.ResponseWriter, r *http.Request) {
	whereToCreate := r.URL.Query().Get("directory")
	if whereToCreate == "" {
		http.Error(w, "Missing 'whereToCreate' parameter", http.StatusBadRequest)
		return
	}

	filePath := path.Join(common.FilesDir, whereToCreate)

	createdPath, err := createFile(filePath)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(createdPath))
}
