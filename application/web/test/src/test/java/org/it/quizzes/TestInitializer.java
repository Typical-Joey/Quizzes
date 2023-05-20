package org.it.quizzes;

import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

@Test
public abstract class TestInitializer {
    private final ChromeDriverHost driverHost = ChromeDriverHost.getInstance();

    @BeforeClass(alwaysRun = true)
    protected void initialize() {
        System.setProperty("webdriver.chrome.driver", "src/main/resources/chromedriver.exe");
    }

    @AfterMethod(alwaysRun = true)
    protected void quit(){
        driverHost.quit();
    }

    public static class TestSuite {
        public static final String SMOKE = "smoke";
        public static final String ACCEPTANCE = "acceptance";
        public static final String RELEASE = "release";
        public static final String DEBUG = "debug";
    }
}
