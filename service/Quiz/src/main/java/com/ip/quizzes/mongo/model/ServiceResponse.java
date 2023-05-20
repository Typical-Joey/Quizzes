package com.ip.quizzes.mongo.model;

public class ServiceResponse {
    private final String message;

    public ServiceResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    @Override
    public String toString() {
        return "ServiceResponse{" +
                "message='" + message + '\'' +
                '}';
    }
}
