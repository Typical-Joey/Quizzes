package org.it.quizzes.homepage;

import org.it.quizzes.UiView;

public class Homepage extends UiView implements HomepageCalibratable {
    private static final String URL = "http://localhost:3000/";
    private static final String LOCATOR_VALUE = "homepage";

    public static Homepage directNav() {
        load(URL);
        return new Homepage();
    }

    @Override
    public boolean isPageDisplayed() {
        return findElementById(LOCATOR_VALUE).isDisplayed();
    }

    @Override
    public boolean isQuizzesDisplayed() {
        return findElementsByName("quiz").size() > 0;
    }
}
