package apiFiles

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"path"
	"runny-code/common"
)

func WriteFileHandle(w http.ResponseWriter, r *http.Request) {
	filePathToSave := r.URL.Query().Get("filePath")
	if filePathToSave == "" {
		http.Error(w, "Missing filePath parameter", http.StatusBadRequest)
		return
	}

	filePathToSave = path.Join(common.FilesDir, filePathToSave)

	newContent, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to read the request body: %s", err.Error()), http.StatusInternalServerError)
		return
	}

	// Open the file with O_WRONLY and O_TRUNC flags to overwrite content
	file, err := os.OpenFile(filePathToSave, os.O_WRONLY|os.O_TRUNC, 0644)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to open the file '%s': %s", filePathToSave, err.Error()), http.StatusInternalServerError)
		return
	}
	defer file.Close()

	_, err = file.Write(newContent)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to write to the file '%s': %s", filePathToSave, err.Error()), http.StatusInternalServerError)
		return
	}

	// Success response
	w.WriteHeader(http.StatusOK)
	w.Write(fmt.Appendf(nil, "File '%s' saved successfully", filePathToSave))
}
