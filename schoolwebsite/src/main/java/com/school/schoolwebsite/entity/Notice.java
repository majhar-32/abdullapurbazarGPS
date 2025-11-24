package com.school.schoolwebsite.entity;

import com.school.schoolwebsite.enums.NoticeCategory;
import jakarta.persistence.*;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "notices")
public class Notice {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String title;

  @Lob
  @Column(columnDefinition = "TEXT")
  private String description;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private NoticeCategory category;

  @Column(name = "publish_date", nullable = false)
  private LocalDate publishDate;

  @Column(name = "is_urgent")
  private Boolean isUrgent = false;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "created_by")
  private User createdBy;

  @Column(name = "created_at")
  private LocalDateTime createdAt;

  @Column(name = "updated_at")
  private LocalDateTime updatedAt;

  @Column(name = "attachment_url")
  private String attachmentUrl;

  @Column(name = "show_in_ticker", nullable = false)
  private Boolean showInTicker = false;

  public Notice() {
  }

  public Notice(Long id, String title, String description, NoticeCategory category, LocalDate publishDate,
      Boolean isUrgent, User createdBy, LocalDateTime createdAt, LocalDateTime updatedAt, String attachmentUrl) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.category = category;
    this.publishDate = publishDate;
    this.isUrgent = isUrgent;
    this.createdBy = createdBy;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.attachmentUrl = attachmentUrl;
  }

  @PrePersist
  protected void onCreate() {
    createdAt = LocalDateTime.now();
    updatedAt = LocalDateTime.now();
  }

  @PreUpdate
  protected void onUpdate() {
    updatedAt = LocalDateTime.now();
  }

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

  public User getCreatedBy() {
    return createdBy;
  }

  public void setCreatedBy(User createdBy) {
    this.createdBy = createdBy;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }

  public LocalDateTime getUpdatedAt() {
    return updatedAt;
  }

  public void setUpdatedAt(LocalDateTime updatedAt) {
    this.updatedAt = updatedAt;
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
