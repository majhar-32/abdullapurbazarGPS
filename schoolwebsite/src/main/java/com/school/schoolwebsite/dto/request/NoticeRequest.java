package com.school.schoolwebsite.dto.request;

import com.school.schoolwebsite.enums.NoticeCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public class NoticeRequest {

  @NotBlank(message = "Title is required")
  private String title;

  @NotBlank(message = "Description is required")
  private String description;

  @NotNull(message = "Category is required")
  private NoticeCategory category;

  @NotNull(message = "Publish date is required")
  private LocalDate publishDate;

  private Boolean isUrgent;

  private String attachmentUrl;

  private Boolean showInTicker;

  public NoticeRequest() {
  }

  public NoticeRequest(String title, String description, NoticeCategory category, LocalDate publishDate,
      Boolean isUrgent, String attachmentUrl) {
    this.title = title;
    this.description = description;
    this.category = category;
    this.publishDate = publishDate;
    this.isUrgent = isUrgent;
    this.attachmentUrl = attachmentUrl;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public NoticeCategory getCategory() {
    return category;
  }

  public void setCategory(NoticeCategory category) {
    this.category = category;
  }

  public LocalDate getPublishDate() {
    return publishDate;
  }

  public void setPublishDate(LocalDate publishDate) {
    this.publishDate = publishDate;
  }

  public Boolean getIsUrgent() {
    return isUrgent;
  }

  public void setIsUrgent(Boolean isUrgent) {
    this.isUrgent = isUrgent;
  }

  public String getAttachmentUrl() {
    return attachmentUrl;
  }

  public void setAttachmentUrl(String attachmentUrl) {
    this.attachmentUrl = attachmentUrl;
  }

  public Boolean getShowInTicker() {
    return showInTicker;
  }

  public void setShowInTicker(Boolean showInTicker) {
    this.showInTicker = showInTicker;
  }
}
