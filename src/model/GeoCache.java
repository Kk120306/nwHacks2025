package model;


import java.awt.Image;
import java.util.ArrayList;

public class GeoCache {
    float locationX; 
    float locationY;

    ArrayList<Image> attachments;
    ArrayList<String> messages;

    MusicPlayer tuneAttachment;



    public GeoCache(float locationX, float locationY){
        this.locationX = locationX;
        this.locationY = locationY;
        attachments = new ArrayList<>();
        messages = new ArrayList<>();
    }


    void attachImages(Image attachment){
        attachments.add(attachment);
    }

    void addMessages(String message) {
        messages.add(message);
    }



}
