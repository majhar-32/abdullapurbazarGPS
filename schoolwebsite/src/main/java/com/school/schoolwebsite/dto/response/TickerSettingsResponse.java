package com.school.schoolwebsite.dto.response;

public class TickerSettingsResponse {

  private Long id;
  private String scrollSpeed;
  private Integer maxItems;
  private Boolean enabled;

  public TickerSettingsResponse() {
  }

  public TickerSettingsResponse(Long id, String scrollSpeed, Integer maxItems, Boolean enabled) {
    this.id = id;
    this.scrollSpeed = scrollSpeed;
    this.maxItems = maxItems;
    this.enabled = enabled;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
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
