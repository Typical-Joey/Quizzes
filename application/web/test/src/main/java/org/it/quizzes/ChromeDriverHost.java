package org.it.quizzes;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import java.nio.file.Paths;
import java.time.Duration;
import java.util.List;
import java.util.Locale;

public class ChromeDriverHost {
    private static final String DRIVERS_PATH = Paths.get("src/main/resources/").toAbsolutePath().toString();
    private static ChromeDriverHost chromeDriverHost;
    private final ChromeDriver driver;

    public ChromeDriverHost() {
        this.driver = instantiateDriver();
    }

    public static ChromeDriverHost getInstance(){
        if(chromeDriverHost == null){
            chromeDriverHost = new ChromeDriverHost();
        }
        return chromeDriverHost;
    }

    public void load(String url){
        driver.get(url);
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(2));
    }

    public void quit(){
        driver.quit();
    }

    private org.openqa.selenium.chrome.ChromeDriver instantiateDriver(){
        String driverExtension = System.getProperty("os.name").toLowerCase(Locale.ROOT).contains("win") ? ".exe" : "";
        System.setProperty("webdriver.chrome.driver", String.format("%s/chromedriver%s", DRIVERS_PATH, driverExtension));
        ChromeOptions options = new ChromeOptions();
        String runHeadless = System.getProperty("headless");
        if (runHeadless.isBlank() || runHeadless.equals("true")) {
            options.addArguments("--headless", "--disable-gpu", "--window-size=1920,1200", "--ignore-certificate-errors", "--remote-allow-origins=*");
        }
        return new org.openqa.selenium.chrome.ChromeDriver(options);
    }

    public WebElement findElement(By by) {
        return driver.findElement(by);
    }

    public List<WebElement> findElements(By by) {
        return driver.findElements(by);
    }
}
