package org.it.quizzes;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import java.util.List;

public abstract class UiView {

    private static final ChromeDriverHost chromeDriverHost = new ChromeDriverHost();
    public static WebElement findElementById(String id){
        return findElement(By.id(id));
    }

    public static List<WebElement> findElementsByName(String name){
        return findElements(By.name(name));
    }

    private static WebElement findElement(By by) {
        return chromeDriverHost.findElement(by);
    }

    private static List<WebElement> findElements(By by){
        return chromeDriverHost.findElements(by);
    }

    public static void load(String url){
        System.out.printf("Navigating to %s...%n", url);
        chromeDriverHost.load(url);
    }
}
