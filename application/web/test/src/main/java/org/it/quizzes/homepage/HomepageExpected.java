package org.it.quizzes.homepage;

public class HomepageExpected implements HomepageCalibratable {
    public static HomepageExpected getInstance() {
        return new HomepageExpected();
    }

    @Override
    public boolean isPageDisplayed() {
        return true;
    }

    @Override
    public boolean isQuizzesDisplayed() {
        return true;
    }
}
