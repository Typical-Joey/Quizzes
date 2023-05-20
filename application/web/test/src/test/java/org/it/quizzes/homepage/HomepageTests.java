package org.it.quizzes.homepage;

import org.it.quizzes.TestInitializer;
import org.testng.Assert;
import org.testng.annotations.Test;

@Test
public class HomepageTests extends TestInitializer {

    @Test(groups = {TestSuite.SMOKE, TestSuite.ACCEPTANCE})
    public void smoke(){
        boolean actual = Homepage.directNav().isPageDisplayed();
        boolean expected = HomepageExpected.getInstance().isPageDisplayed();
        Assert.assertEquals(actual, expected);
    }

    @Test(groups = {TestSuite.ACCEPTANCE})
    public void quizzesDisplayed(){
        boolean actual = Homepage.directNav().isQuizzesDisplayed();
        boolean expected = HomepageExpected.getInstance().isQuizzesDisplayed();
        Assert.assertEquals(actual, expected);
    }
}
