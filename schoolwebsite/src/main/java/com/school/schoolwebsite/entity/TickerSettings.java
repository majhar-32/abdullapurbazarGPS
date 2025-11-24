package com.school.schoolwebsite.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "ticker_settings")
public class TickerSettings {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "scroll_speed", nullable = false)
  private String scrollSpeed = "MEDIUM"; // "SLOW", "MEDIUM", "FAST"

  @Column(name = "max_items", nullable = false)
  private Integer maxItems = 10;

  @Column(nullable = false)
  private Boolean enabled = true;

  // Constructors
  public TickerSettings() {
  }

  public TickerSettings(String scrollSpeed, Integer maxItems, Boolean enabled) {
    this.scrollSpeed = scrollSpeed;
    this.maxItems = maxItems;
    this.enabled = enabled;
  }

  // Getters and Setters
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
