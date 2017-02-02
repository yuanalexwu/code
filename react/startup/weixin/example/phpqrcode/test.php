<?php
include "qrlib.php";


$errorCorrectionLevel = 'L';
if (isset($_REQUEST['level']) && in_array($_REQUEST['level'], array('L', 'M', 'Q', 'H')))
    $errorCorrectionLevel = $_REQUEST['level'];

$matrixPointSize = 4;
if (isset($_REQUEST['size']))
    $matrixPointSize = min(max((int)$_REQUEST['size'], 1), 10);

if (isset($_REQUEST['data'])) {
    //it's very important!
    if (trim($_REQUEST['data']) == '')
        die('data cannot be empty!');
    $data = 'http://' . $_SERVER['HTTP_HOST'] . "/index.php?m=sales&a=checkinfo&id=" . $_REQUEST['data'];

    // user data
    // QRcode::png($_REQUEST['data'], false, $errorCorrectionLevel, $matrixPointSize, 2);
    QRcode::png($data, false, 'L', 4, 2);
}
