package commands

import (
	"runny-code/common"

	"golang.org/x/crypto/ssh"
)

func SShExecute(command string) (outputByte []byte, err error) {
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
		return
	}
	defer client.Close()

	// Create a session
	session, err := client.NewSession()
	if err != nil {
		return
	}
	defer session.Close()

	// Run a command and print output
	outputByte, err = session.CombinedOutput(command)
	if err != nil {
		return
	}

	return
}