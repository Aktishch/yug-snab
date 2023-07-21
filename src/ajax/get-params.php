<?php

  $data = [

    "name" => $_GET["name"],
    "radio" => $_GET["radio"],
    "checkbox" => ""

  ];

  for ($i = 0; $i < count($_GET["checkbox"]); $i++) {

    if (isset($_GET["checkbox"][$i])) $data["checkbox"] .= $_GET["checkbox"][$i] . " ";

  }

?>

<form>
  <input type="hidden" value="<?= $data["name"] ?>" name="name">
  <input type="hidden" value="<?= $data["checkbox"] ?>" name="checkbox">
  <input type="hidden" value="<?= $data["radio"] ?>" name="radio">
</form>