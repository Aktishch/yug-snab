<?
  /*
    Name: PHP Ajax
    Autor:  Alexander Aktishchev
  */

  $chat_id = "179128970";
  $mail_to = "aktishch@gmail.com";
  $mail_from = "robot@frontendstdkit.ru";
  $logo = ((!empty($_SERVER["HTTPS"])) ? "https" : "http") . "://" . $_SERVER["HTTP_HOST"] . "/img/pictures/logo.png";
  $subject = "Письмо с сайта frontendstdkit.ru";
  $path = "uploads/";
  $boundary = "---" . md5(uniqid(time()));
  $file_name = "";
  $file_read = "";
  $message = "";

  $data = [
    "Форма:" => $_POST["theme"],
    "Имя:" => $_POST["name"],
    "Телефон:" => $_POST["tel"],
  ];

  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    foreach($data as $key => $value) {
      if (isset($value) && !empty($value)) {
        if (count($value) == 1) {
          $message .= "<b>" . $key . "</b> " . $value . "\n";
        } else {
          $message .= "<b>" . $key . "</b> ";
          for ($i = 0; $i < count($value); $i++) {
            if (isset($value[$i])) $message .= $value[$i] . " ";
          }
          $message .= "\n";
        }
      }
    }

    for ($i = 0; $i < count($_FILES["file"]["tmp_name"]); $i++) {
      if ($_FILES["file"]["name"][$i] && @copy($_FILES["file"]["tmp_name"][$i], $path . $_FILES["file"]["name"][$i])) {
        $files[] = "/ajax/" . $path . $_FILES["file"]["name"][$i];
      }
    }
    
    t_me($message, $files, [$chat_id]);

    $message = str_replace("%0A", "<br>", $message);

    for ($i = 0; $i < count($_FILES["file"]["tmp_name"]); $i++) {
      if ($_FILES["file"]["error"][$i] == UPLOAD_ERR_OK) {
        $ext = strtolower(pathinfo($_FILES["file"]["name"][$i], PATHINFO_EXTENSION));
        $file_name = md5(uniqid("", true)) . "." . $ext;
      }
    }

    $html = "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\">";
    $html .= "<html lang=\"ru\">";
    $html .= "<head>";
    $html .= "<meta charset=\"UTF-8\">";
    $html .= "<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">";
    $html .= "<meta http-equiv=\"autor\" content=\"Студия КИТ\">";
    $html .= "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">";
    $html .= "<title>" . $subject . "</title>";
    $html .= "</head>";
    $html .= "<body>";
    $html .= "<div style=\"color: black; background-color: grey; font-size: 16px; border-radius: 8px; line-height: 1.5; margin: 0; padding: 16px;\">";
    $html .= "<img src=\"" . $logo . "\" width=\"150\" alt=\"Логотип\"><br>";
    $html .= "<p>" . $message . "</p>";
    $html .= "</div>";
    $html .= "</body>";
    $html .= "</html>";

    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "From: " . $mail_from . "\r\n";
    $headers .= "Reply-To: " . $mail_from . "\r\n";
    $headers .= "Content-Type: multipart/mixed; boundary=\"" . $boundary . "\"";

    $body = "--" . $boundary . "\n";
    $body .= "Content-type: text/html; charset=utf-8\n";
    $body .= "Content-Transfer-Encoding: quoted-printablenn";
    $body .= "Content-Disposition: attachment; filename==?utf-8?B?" . base64_encode($file_name) . "?=\n\n";
    $body .= $html . "\n";
    $body .= "--" . $boundary . "\n";
    $body .= "Content-Type: application/octet-stream; name==?utf-8?B?" . base64_encode($file_name) . "?=\n";
    $body .= "Content-Transfer-Encoding: base64\n";
    $body .= "Content-Disposition: attachment; filename==?utf-8?B?" . base64_encode($file_name) . "?=\n\n";
    $body .= chunk_split(base64_encode($file_read)) . "\n";
    $body .= "--" . $boundary . "--\n";

    mail($mail_to, $subject, $body, $headers);

  }

  function t_me($tgText, $files = false, $chats_id = ["-xxx"]) {
    $token = "5793846411:AAFCaqozitrr8qP9Bcmuh2GOhFubV9mX4F4";
    $site = $_SERVER["SERVER_NAME"];

    foreach ($chats_id as $chat) {
      $url = "https://api.telegram.org/bot{$token}/sendMessage";
      
      $arrayQuery = [
        "chat_id" => $chat,
        "text" => $site . "\n" . $tgText . $files[0],
        "parse_mode" => "html"
      ];

      if (is_array($files)) {
        if(count($files) == 1) {
          $url = "https://api.telegram.org/bot" . $token . "/sendDocument";
          $arrayQuery["document"] = $site . $files[0];
          $arrayQuery["caption"] = $tgText;
        } else {
          $arMedia = array();
          $url = "https://api.telegram.org/bot" . $token . "/sendMediaGroup";

          foreach ($files as $key => $path) {
            if ($key == 0) {
              $arMedia[] = array(
                "type" => "photo",
                "media" => $site . $path,
                "caption" => $tgText,
                "parse_mode" => "html"
              );
            } else {
              $arMedia[] = array(
                "type" => "photo",
                "media" => $site . $path
              );
            }
          }

          $arrayQuery["media"] = json_encode($arMedia);
        }
      }
      
      $ch = curl_init();
      curl_setopt($ch, CURLOPT_URL, $url);
      curl_setopt($ch, CURLOPT_POST, 1);
      curl_setopt($ch, CURLOPT_POSTFIELDS, $arrayQuery);
      curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type:multipart/form-data"]);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
      curl_setopt($ch, CURLOPT_HEADER, false);
      $res = curl_exec($ch);
      curl_close ($ch);

      return $res;
    }
  }

?>