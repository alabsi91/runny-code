package apiFiles

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"path"
	"path/filepath"
	"runny-code/common"
)

func UploadHandle(w http.ResponseWriter, r *http.Request) {
	destination := r.URL.Query().Get("destination")
	if destination == "" {
		http.Error(w, "Missing 'destination' parameter", http.StatusBadRequest)
		return
	}

	destination = path.Join(common.FilesDir, destination)

	err := r.ParseMultipartForm(0) // 0 means no explicit memory limit
	if err != nil {
		http.Error(w, "Unable to parse form", http.StatusBadRequest)
		return
	}

	files := r.MultipartForm.File["files"]
	if len(files) == 0 {
		http.Error(w, "No files uploaded", http.StatusBadRequest)
		return
	}

	warnings := []string{} // To track skipped files

	// Process each file
	for _, fileHeader := range files {
		file, err := fileHeader.Open()
		if err != nil {
			http.Error(w, fmt.Sprintf("Error opening file '%s': %v", fileHeader.Filename, err), http.StatusInternalServerError)
			return
		}
		defer file.Close()

		filePath := filepath.Join(destination, fileHeader.Filename)
		if _, err := os.Stat(filePath); err == nil {
			warnings = append(warnings, fmt.Sprintf("File '%s' already exists and was skipped", fileHeader.Filename))
			continue
		}

		if isExcluded(filePath) {
			warnings = append(warnings, fmt.Sprintf("File '%s' uploaded but is excluded; you will not be able to access it.", fileHeader.Filename))
		}

		if !isIncluded(filePath) {
			warnings = append(warnings, fmt.Sprintf("File '%s' uploaded but is not included; you will not be able to access it.", fileHeader.Filename))
		}

		dst, err := os.Create(filePath)
		if err != nil {
			http.Error(w, fmt.Sprintf("Error creating file %s: %v", fileHeader.Filename, err), http.StatusInternalServerError)
			return
		}
		defer dst.Close()

		// Stream the content from the uploaded file to the destination file
		_, err = io.Copy(dst, file)
		if err != nil {
			http.Error(w, fmt.Sprintf("Error saving file %s: %v", fileHeader.Filename, err), http.StatusInternalServerError)
			return
		}
	}

	// Prepare response with warnings
	response := struct {
		Warnings []string `json:"warnings"`
	}{Warnings: warnings}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}
