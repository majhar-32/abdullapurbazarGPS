package com.school.schoolwebsite.controller;

import com.school.schoolwebsite.dto.request.NoticeRequest;
import com.school.schoolwebsite.dto.request.TickerSettingsRequest;
import com.school.schoolwebsite.dto.response.NoticeResponse;
import com.school.schoolwebsite.dto.response.TickerSettingsResponse;
import com.school.schoolwebsite.enums.NoticeCategory;
import com.school.schoolwebsite.service.NoticeService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notices")
public class NoticeController {

  private final NoticeService noticeService;

  public NoticeController(NoticeService noticeService) {
    this.noticeService = noticeService;
  }

  @GetMapping
  public ResponseEntity<List<NoticeResponse>> getAllNotices() {
    return ResponseEntity.ok(noticeService.getAllNotices());
  }

  @GetMapping("/{id}")
  public ResponseEntity<NoticeResponse> getNoticeById(@PathVariable Long id) {
    return ResponseEntity.ok(noticeService.getNoticeById(id));
  }

  @GetMapping("/category/{category}")
  public ResponseEntity<List<NoticeResponse>> getNoticesByCategory(@PathVariable NoticeCategory category) {
    return ResponseEntity.ok(noticeService.getNoticesByCategory(category));
  }

  @GetMapping("/urgent")
  public ResponseEntity<List<NoticeResponse>> getUrgentNotices() {
    return ResponseEntity.ok(noticeService.getUrgentNotices());
  }

  // Ticker endpoints (public)
  @GetMapping("/ticker")
  public ResponseEntity<List<NoticeResponse>> getTickerNotices() {
    return ResponseEntity.ok(noticeService.getTickerNotices());
  }

  @GetMapping("/ticker/settings")
  public ResponseEntity<TickerSettingsResponse> getTickerSettings() {
    return ResponseEntity.ok(noticeService.getTickerSettings());
  }

  @PostMapping
  public ResponseEntity<NoticeResponse> createNotice(
      @Valid @RequestBody NoticeRequest request,
      Authentication authentication) {
    String username = authentication.getName();
    NoticeResponse response = noticeService.createNotice(request, username);
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }

  @PutMapping("/{id}")
  public ResponseEntity<NoticeResponse> updateNotice(
      @PathVariable Long id,
      @Valid @RequestBody NoticeRequest request) {
    return ResponseEntity.ok(noticeService.updateNotice(id, request));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteNotice(@PathVariable Long id) {
    noticeService.deleteNotice(id);
    return ResponseEntity.noContent().build();
  }

  // Admin ticker settings endpoint
  @PutMapping("/ticker/settings")
  public ResponseEntity<TickerSettingsResponse> updateTickerSettings(
      @Valid @RequestBody TickerSettingsRequest request) {
    return ResponseEntity.ok(noticeService.updateTickerSettings(request));
  }
}
