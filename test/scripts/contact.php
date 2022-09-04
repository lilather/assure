<?php


$json = file_get_contents('php://input');
$data = json_decode($json);
	if($_POST) {

		$to = "assurestudios@gmail.com"; // Your email here
		$subject = 'Message from my website'; // Subject message here
	}
	//Send mail function
	function send_mail($to,$subject,$message,$headers){
		if(@mail($to,$subject,$message,$headers)){
			echo json_encode(array('info' => 'success', 'msg' => "Your message has been sent. Thank you!"));
		} else {
			echo json_encode(array('info' => 'error', 'msg' => "Error, your message hasn't been sent"));
		}
	}

	//Check if $_POST vars are set
	if(!isset($_POST['f_name']) || !isset($_POST['email'])){
		echo json_encode(array('info' => 'error', 'msg' => 'Please fill out all fields'));

	}

	//Sanitize input data, remove all illegal characters
	$name = filter_var($_POST['f_name'], FILTER_SANITIZE_STRING);
	$email = filter_var($_POST['email'], FILTER_SANITIZE_STRING);
	$message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);
	$tel = filter_var($_POST['phone'], FILTER_SANITIZE_STRING);

	//Validation
	if($name == '') {
    echo var_dump($_POST);
		echo json_encode(array('info' => 'error', 'msg' => "Please enter your nvame."));
		exit();
	}
	if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
		echo json_encode(array('info' => 'error', 'msg' => "Please enter valid e-mail."));
		exit();
	}


	//Send Mail
	$headers = 'From: ' . $email .''. "\r\n".
	'Reply-To: '.$email.'' . "\r\n" .
	'X-Mailer: PHP/' . phpversion();

	send_mail($to, $subject, $message . "\r\n\n"  .'Name: '.$name. "\r\n" .'Email: '.$email, $headers);
?>
