package com.school.schoolwebsite.dto.request;

public class TickerSettingsRequest {

  private String scrollSpeed;
  private Integer maxItems;
  private Boolean enabled;

  public TickerSettingsRequest() {
  }

  public TickerSettingsRequest(String scrollSpeed, Integer maxItems, Boolean enabled) {
    this.scrollSpeed = scrollSpeed;
    this.maxItems = maxItems;
    this.enabled = enabled;
  }

  public String getScrollSpeed() {
    return scrollSpeed;
  }

  public void setScrollSpeed(String scrollSpeed) {
    this.scrollSpeed = scrollSpeed;
  }

  public Integer getMaxItems() {
    return maxItems;
  }

  public void setMaxItems(Integer maxItems) {
    this.maxItems = maxItems;
  }

  public Boolean getEnabled() {
    return enabled;
  }

  public void setEnabled(Boolean enabled) {
    this.enabled = enabled;
  }
}
