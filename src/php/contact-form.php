<?php
    require_once 'phpmailer/PHPMailerAutoload.php';
    if (isset($_POST['name']) && isset($_POST['email']) && isset($_POST['subject']) && isset($_POST['message'])) {
        //check if any of the inputs are empty
        if (empty($_POST['name']) || empty($_POST['email']) || empty($_POST['subject']) || empty($_POST['message'])) {
            $data = array('success' => false, 'message' => 'Please fill out the form completely.');
            echo json_encode($data);
            exit;
        }

        //create an instance of PHPMailer
        $mail = new PHPMailer();
        $mail->From = $_POST['email'];
        $mail->FromName = $_POST['name'];
        $mail->AddAddress($_POST['recipient']); //recipient 
        $mail->Subject = $_POST['subject'];
        $mail->Body = "Name: " . $_POST['name'] . "\r\n\r\nMessage: " . stripslashes($_POST['message']);
        if (isset($_POST['ref'])) {
            $mail->Body .= "\r\n\r\nRef: " . $_POST['ref'];
        }
        if(!$mail->send()) {
            $data = array('success' => false, 'message' => 'MMMessage could not be sent. Mailer Error: ' . $mail->ErrorInfo);
            echo json_encode($data);
            exit;
        }
        $data = array('success' => true, 'message' => 'Thanks! We have received your message.');
        echo json_encode($data);
    } else {
        $data = array('success' => false, 'message' => 'Please fill out the form completely.');
        echo json_encode($data);
    }
?>