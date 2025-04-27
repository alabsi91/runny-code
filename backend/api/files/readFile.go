package apiFiles

import (
	"fmt"
	"net/http"
	"os"
	"path"
	"runny-code/common"
	"slices"
)

func ReadFileHandle(w http.ResponseWriter, r *http.Request) {
	files, err := readFiles(common.FilesDir)
	if err != nil {
		http.Error(w, "Error reading the files directory", http.StatusInternalServerError)
		return
	}

	if len(files) == 0 {
		http.Error(w, "Error No files found", http.StatusInternalServerError)
		return
	}

	requestedFilePath := r.URL.Query().Get("filePath")
	requestedFilePath = path.Join(common.FilesDir, requestedFilePath)

	exists := slices.Contains(files, requestedFilePath)
	if !exists {
		http.Error(w, fmt.Sprintf("Can't find the file '%s'", requestedFilePath), http.StatusInternalServerError)
		return
	}

	// read the file
	content, err := os.ReadFile(requestedFilePath)
	if err != nil {
		http.Error(w, "Error reading file", http.StatusInternalServerError)
		return
	}

	// Set the content type
	w.Header().Set("Content-Type", "text/plain")

	// Write the file contents to the response
	w.Write(content)
}
