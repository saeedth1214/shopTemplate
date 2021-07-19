<?php

namespace App\Services;

use App\Repositories\UserRepositories;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Str;

class fileUpload
{
    private $file = null;
    private $fileResult = null;
    private $filePath = null;
    private $basePath = null;
    private static $userRepo = null;
    private static $arternativefile = "/bannerUpload/500X500.gif";
    private static $directoryImg = "/bannerUpload";
    private $fileToWrite=null;
    private $importFile= "../../images/products/";
    const FORMAT = ['.png', '.jpg', '.jpeg'];

//    const BASE_URL

    public function __construct(string $baseFile, string $result)
    {
        $this->file = $baseFile;
        $this->fileResult=$result;
        $this->filePath = $_SERVER["DOCUMENT_ROOT"]."../"."resources/js/Admin/images/products";
        $this->fileToWrite = $_SERVER["DOCUMENT_ROOT"]."../"."resources/js/Admin/components/common/data.js";
        $this->basePath = Config::get('constants.options.BASE_URL') . Config::get('constants.options.UPLOAD_PATH');
    }

    private function generateString()
    {
        $str=str::random(4);
        $pattern='/[0-9]/';
        return preg_match($pattern, $str[0]) ? $this->generateString():$str;
    }
    private function writeToFile($fileName, $var)
    {
        
        // $write=fopen($this->fileToWrite, "a");
        $newName=explode(".", $fileName);
        $textToWrite= "import ".$newName[0]." from '".$this->importFile.$fileName."';\n"."export const $var =  $newName[0];\n";
        file_put_contents($this->fileToWrite, $textToWrite,FILE_APPEND);
        // fwrite($write, $textToWrite);
        // fclose($write);
    }
    private function extension()
    {
        $arr = explode('.', $this->file);
        return "." . strtolower(end($arr));
    }

    public function move()
    {
        $var = $this->generateString();
        $newFileName=$this->generateString(). $this->extension();

        file_put_contents($this->filePath . DIRECTORY_SEPARATOR . $newFileName, $this->fileResult);

        // $file = fopen($this->filePath . DIRECTORY_SEPARATOR . $newFileName, "wb");
        // $write=fwrite($file, $this->fileResult);
        // fclose($file);
        // if (!$write) {
        //     return $write;
        // }
        $this->writeToFile($newFileName, $var);
        return [$newFileName,$var];
    }

    public function isFormatOk()
    {
        return in_array($this->extension(), self::FORMAT);
    }

    public static function getBasenameFromUrl($url)
    {
        if (!is_null($url)) {
            $arr = explode('/', $url);
            $filename = end($arr);
            $filePath = public_path("bannerUpload") . "/" . $filename;
            $Imgfile = self::$directoryImg . "/" . $filename;
            return (file_exists($filePath) && is_readable($filePath)) ? $Imgfile : self::$arternativefile;
        }
        return self::$arternativefile;
    }

    public function UpdateFile($uid, $file)
    {
        self::$userRepo = resolve(UserRepositories::class);
        $url = self::$userRepo->getAvatar($uid);
        if (!is_null($url)) {
            if (self::removeFile($url)) {
                return $this->move($file);
            }
        }
        return $this->move($file);
    }

    private static function removeFile($url)
    {
        $filename = self::getBasenameFromUrl($url);
        return ($filename != "500X500.gif" && file_exists(public_path($filename)) && is_readable(public_path($filename)))
            ? unlink(public_path($filename)) : 0;
    }
}
