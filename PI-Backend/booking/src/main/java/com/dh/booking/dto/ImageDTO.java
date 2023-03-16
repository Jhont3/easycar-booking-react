package com.dh.booking.dto;

import com.dh.booking.model.Image;

import java.util.List;

public class ImageDTO {
    private Long id;
    private String title;
    private String url;
    private Long cars_id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Long getCars_id() {
        return cars_id;
    }

    public void setCars_id(Long cars_id) {
        this.cars_id = cars_id;
    }

    @Override
    public String toString() {
        return "ImageDTO{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", url='" + url + '\'' +
                ", cars_id=" + cars_id +
                '}';
    }
}
