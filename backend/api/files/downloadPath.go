package apiFiles

import (
	"archive/zip"
	"fmt"
	"io"
	"net/http"
	"os"
	"path"
	"path/filepath"
	"runny-code/common"
)

func DownloadHandle(w http.ResponseWriter, r *http.Request) {
	pathToDownload := r.URL.Query().Get("path")
	if pathToDownload == "" {
		http.Error(w, "Missing 'path' parameter", http.StatusBadRequest)
		return
	}

	fullPath := path.Join(common.FilesDir, pathToDownload)

	// Check if the path exists and get its info
	fileInfo, err := os.Stat(fullPath)
	if os.IsNotExist(err) {
		http.Error(w, "File or directory not found", http.StatusNotFound)
		return
	} else if err != nil {
		http.Error(w, fmt.Sprintf("Could not access file or directory: %v", err), http.StatusInternalServerError)
		return
	}

	// directory
	if fileInfo.IsDir() {
		zipFilePath, err := zipDirectory(fullPath)
		if err != nil {
			http.Error(w, fmt.Sprintf("Error zipping directory: %v", err), http.StatusInternalServerError)
			return
		}
		defer os.Remove(zipFilePath) // Clean up

		sendFile(w, r, zipFilePath, filepath.Base(zipFilePath))
		return
	}

	// file
	sendFile(w, r, fullPath, fileInfo.Name())
}


func zipDirectory(sourceDir string) (string, error) {
	zipFilePath := sourceDir + ".zip"
	zipFile, err := os.Create(zipFilePath)
	if err != nil {
		return "", fmt.Errorf("failed to create zip file: %w", err)
	}
	defer zipFile.Close()

	zipWriter := zip.NewWriter(zipFile)
	defer zipWriter.Close()

	// Walk through the directory and add files to the zip
	err = filepath.Walk(sourceDir, func(filePath string, info os.FileInfo, err error) error {
		if err != nil {
			return fmt.Errorf("error walking file path %s: %w", filePath, err)
		}

		// Get the relative path for the zip entry
		relPath, err := filepath.Rel(sourceDir, filePath)
		if err != nil {
			return fmt.Errorf("failed to get relative path: %w", err)
		}

		// Create a zip entry for directories or files
		if info.IsDir() {
			_, err = zipWriter.Create(relPath + "/")
			if err != nil {
				return fmt.Errorf("failed to create directory entry in zip: %w", err)
			}
		} else {
			zipEntry, err := zipWriter.Create(relPath)
			if err != nil {
				return fmt.Errorf("failed to create zip entry for file: %w", err)
			}

			// Open the file for reading
			file, err := os.Open(filePath)
			if err != nil {
				return fmt.Errorf("failed to open file for zipping: %w", err)
			}
			defer file.Close()

			_, err = io.Copy(zipEntry, file)
			if err != nil {
				return fmt.Errorf("failed to write file to zip: %w", err)
			}
		}
		return nil
	})

	if err != nil {
		return "", err
	}

	return zipFilePath, nil
}

func sendFile(w http.ResponseWriter, r *http.Request, filePath string, fileName string) {
	file, err := os.Open(filePath)
	if err != nil {
		http.Error(w, fmt.Sprintf("Could not open file: %v", err), http.StatusInternalServerError)
		return
	}
	defer file.Close()

	fileInfo, err := file.Stat()
	if err != nil {
		http.Error(w, fmt.Sprintf("Could not get file info: %v", err), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/octet-stream")
	w.Header().Set("Content-Disposition", fmt.Sprintf("attachment; filename=%s", fileName))
	w.Header().Set("Content-Length", fmt.Sprintf("%d", fileInfo.Size()))

	http.ServeContent(w, r, fileInfo.Name(), fileInfo.ModTime(), file)
}
