package apiFiles

import (
	"net/http"
	"path"
	"runny-code/common"
)

func ReadFileHandle(w http.ResponseWriter, r *http.Request) {
	requestedFilePath := r.URL.Query().Get("filePath")
	requestedFilePath = path.Join(common.FilesDir, requestedFilePath)

	// read the file
	content, err := readTextFile(requestedFilePath)
	if err != nil {
		http.Error(w, "Error reading file: "+err.Error(), http.StatusInternalServerError)
		return
	}

	// Set the content type
	w.Header().Set("Content-Type", "text/plain")

	// Write the file contents to the response
	w.Write(content)
}
