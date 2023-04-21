<?
  /*
    Name: PHP Ajax
    Autor:  Alexander Aktishchev
  */

  // Токен
  const TOKEN = "5793846411:AAFCaqozitrr8qP9Bcmuh2GOhFubV9mX4F4";

  // ID чата
  const CHAT_ID = "179128970";

  // Содержимое
  $content = ["chat_id" => CHAT_ID];

  // Медиа
  $media = [];

  // Почта получателя
  $mail_to = "aktishch@gmail.com";

  // Почта отправителя
  $mail_from = "robot@frontendstdkit.ru";
    
  // Логотип
  $logo = ((!empty($_SERVER["HTTPS"])) ? "https" : "http") . "://" . $_SERVER["HTTP_HOST"] . "/img/pictures/logo.png";

  // Тема сообщения
  $subject = "Письмо с сайта frontend.stdkit.ru";

  // Путь к каталогу для загрузки файлов
  $path = "uploads/";

  // Разделитель
  $boundary = "---" . md5(uniqid(time()));

  // Файл
  $file_name = "";
  $file_read = "";

  // Сообщение
  $message = "";

  // Содержимое письма
  $html = "";
  $headers = "";
  $body = "";

  // Данные
  $data = [

    "Форма:" => $_POST["theme"],
    "Имя:" => $_POST["name"],
    "Телефон:" => $_POST["tel"],
    "Почта:" => $_POST["email"],
    "Заезд:" => $_POST["check-in"],
    "Выезд:" => $_POST["check-out"],
    "Номер:" => $_POST["number"],
    "Список:" => $_POST["select"],
    "Вопрос:" => $_POST["text"],
    "Радио:" => $_POST["radio"],
    "Чекбокс:" => $_POST["checkbox"],
    "Пароль:" => $_POST["password"]

  ];

  // Проверка метода запроса
  if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Проверка наличия данных и заполненности полей
    foreach($data as $key => $value) {

      if (isset($value) && !empty($value)) {

        if (count($value) == 1) {

          $message .= "<b>" . $key . "</b> " . $value . "%0A";

        } else {

          $message .= "<b>" . $key . "</b> ";

          for ($i = 0; $i < count($value); $i++) {

            if (isset($value[$i])) $message .= $value[$i] . " ";

          }

          $message .= "%0A";

        }

      }

    }

    // Отправка в телеграмм 
    $send_to_telegram = @file_get_contents("https://api.telegram.org/bot" . TOKEN . "/sendMessage?chat_id=" . CHAT_ID . "&parse_mode=html&text=" . $message); 

    // Проверка успешной отправки
    if (isset(json_decode($send_to_telegram) -> {"ok"}) && json_decode($send_to_telegram) -> {"ok"}) {

      // Проверка наличия файлов
      if ($_FILES["file"]["tmp_name"]) {

        // Обработчик файла для телеграмма
        for ($i = 0; $i < count($_FILES["file"]["tmp_name"]); $i++) {

          // Проверка файла и копирование его в каталог
          if ($_FILES["file"]["name"][$i] && @copy($_FILES["file"]["tmp_name"][$i], $path . $_FILES["file"]["name"][$i])) {

            // Присвоение пути файла
            $content[$_FILES["file"]["name"][$i]] = new CURLFile(realpath($path . $_FILES["file"]["name"][$i]));

            // Получение файла
            $media[] = ["type" => "document", "media" => "attach://" . $_FILES["file"]["name"][$i]];

          }

        }

        // Присвоение файла
        $content["media"] = json_encode($media);

        // Создание нового ресурса cURL
        $curl = curl_init();

        // Создание заголовка
        curl_setopt($curl, CURLOPT_HTTPHEADER, ["Content-Type:multipart/form-data"]);

        // Установка URL
        curl_setopt($curl, CURLOPT_URL, "https://api.telegram.org/bot" . TOKEN . "/sendMediaGroup");

        // Возврат результата
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

        // Отправка файла
        curl_setopt($curl, CURLOPT_POSTFIELDS, $content);

        // Загрузка страницы и выдача её браузеру
        curl_exec($curl);

        // Завершение сеанса и освобождение ресурсов
        curl_close($curl);

        // Загруженный файл в каталог
        $files = glob($path . "*");

        // Удаление файла из каталога
        foreach($files as $file) {

          if(is_file($file)) unlink($file);

        }

      }

    }

    // Замена переносов в сообщении для отправки на почту
    $message = str_replace("%0A", "<br>", $message);

    // Обработчик файла для почты
    for ($i = 0; $i < count($_FILES["file"]["tmp_name"]); $i++) {

      // Проверка наличия ошибки
      if ($_FILES["file"]["error"][$i] == UPLOAD_ERR_OK) {

        // Получение расширение файла
        $ext = strtolower(pathinfo($_FILES["file"]["name"][$i], PATHINFO_EXTENSION));

        // Получение уникального имени под которым будет сохранён файл
        $file_name = md5(uniqid("", true)) . "." . $ext;

        // Перемещение файла из временного хранилища в указанную директорию
        if (move_uploaded_file($_FILES["file"]["tmp_name"][$i], $path . $file_name)) {

          // Открытие файла
          $file_open = fopen($path . $file_name, "r");

          // Считывание файла
          $file_read = fread($file_open, filesize($path . $file_name));

          // Закрытие файла
          fclose($file_open);

        }

      }

    }

    // HTML письма
    $html .= "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\">";
    $html .= "<html lang=\"ru\">";
    $html .= "<head>";
    $html .= "<meta charset=\"UTF-8\">";
    $html .= "<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">";
    $html .= "<meta http-equiv=\"autor\" content=\"Александр Актищев (Студия КИТ)\">";
    $html .= "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">";
    $html .= "<title>" . $subject . "</title>";
    $html .= "</head>";
    $html .= "<body>";
    $html .= "<div style=\"color: #ffffff; background-color: #000000; font-size: 16px; border-radius: 8px; line-height: 1.5; margin: 0; padding: 16px;\">";
    $html .= "<img src=\"" . $logo . "\" width=\"150\" alt=\"Логотип\"><br>";
    $html .= "<p>" . $message . "</p>";
    $html .= "</div>";
    $html .= "</body>";
    $html .= "</html>";

    // Заголовки
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "From: " . $mail_from . "\r\n";
    $headers .= "Reply-To: " . $mail_from . "\r\n";
    $headers .= "Content-Type: multipart/mixed; boundary=\"" . $boundary . "\"";

    // Тело сообщения
    $body .= "--" . $boundary . "\n";
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

    // Отправка сообщения
    mail($mail_to, $subject, $body, $headers);

  }

?>