package commands

import (
	"io"
	"runny-code/common"
	"strings"

	"golang.org/x/crypto/ssh"
)

func createSession() (*ssh.Client, *ssh.Session, error) {
	config := &ssh.ClientConfig{
		User: common.SSH_User_Env,
		Auth: []ssh.AuthMethod{
			ssh.Password(common.SSH_Password_Env),
		},
		HostKeyCallback: ssh.InsecureIgnoreHostKey(), // For demo; avoid in production
	}

	// Connect to the remote server
	client, err := ssh.Dial("tcp", common.SSH_Host_Env+":"+common.SSH_Port_Env, config)
	if err != nil {
		return nil, nil, err
	}

	session, err := client.NewSession()
	if err != nil {
		return nil, nil, err
	}

	return client, session, nil
}

func SShExecute(command string) (outputByte []byte, err error) {
	client, session, err := createSession()
	if err != nil {
		return
	}
	defer session.Close()
	defer client.Close()

	// Run a command and print output
	outputByte, err = session.CombinedOutput(command)
	if err != nil {
		return
	}

	return
}

func SShExecuteStream(command string, outputHandler func(output string)) error {
	client, session, err := createSession()
	if err != nil {
		return err
	}
	defer session.Close()
	defer client.Close()

	// Get stdout and stderr pipes
	stdout, err := session.StdoutPipe()
	if err != nil {
		return err
	}
	stderr, err := session.StderrPipe()
	if err != nil {
		return err
	}

	// Start the command
	if err := session.Start(command); err != nil {
		return err
	}

	// Stream stdout and stderr concurrently
	errChan := make(chan error, 2)
	go streamOutput(stdout, outputHandler, errChan)
	go streamOutput(stderr, outputHandler, errChan)

	// Wait for both streams to finish
	for range 2 {
		if streamErr := <-errChan; streamErr != nil {
			return streamErr
		}
	}

	// Wait for the command to finish
	return session.Wait()
}

// Stream output by sending the entire accumulated output on each update
func streamOutput(reader io.Reader, outputHandler func(output string), errChan chan error) {
	var currentOutput string
	buffer := make([]byte, 1024)

	for {
		n, err := reader.Read(buffer)
		if n > 0 {
			chunk := string(buffer[:n])

			// Handle carriage return and newline logic
			if strings.Contains(chunk, "\r") {
				parts := strings.Split(chunk, "\r")
				currentOutput = parts[len(parts)-1] // Keep only the last line after `\r`
			} else {
				currentOutput += chunk
			}

			outputHandler(currentOutput)
		}

		if err != nil {
			if err == io.EOF {
				errChan <- nil // Signal normal completion for EOF
			} else {
				errChan <- err // Signal an actual error
			}
			return
		}
	}
}
