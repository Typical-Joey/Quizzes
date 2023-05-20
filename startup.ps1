param($unit)
$root = Get-Location;

wt -w 0 nt -d "$root./application/web/source" --title "CLIENT";
wt -w 0 nt -d "$root./application/web/test" --title "CLIENT IT";
wt -w 0 nt -d "$root./service/Quiz" --title "QUIZ SERVICE";
wt -w 0 nt -d "$root./service/Quiz" --title "QUIZ DB";


if ($unit -eq "true") {
    wt -w 0 nt -d "$root./application/web/source" --title "CLIENT UT";
}
