package com.school.schoolwebsite.service;

import com.school.schoolwebsite.dto.request.NoticeRequest;
import com.school.schoolwebsite.dto.request.TickerSettingsRequest;
import com.school.schoolwebsite.dto.response.NoticeResponse;
import com.school.schoolwebsite.dto.response.TickerSettingsResponse;
import com.school.schoolwebsite.enums.NoticeCategory;

import java.util.List;

public interface NoticeService {
  NoticeResponse createNotice(NoticeRequest request, String username);

  NoticeResponse updateNotice(Long id, NoticeRequest request);

  void deleteNotice(Long id);

  NoticeResponse getNoticeById(Long id);

  List<NoticeResponse> getAllNotices();

  List<NoticeResponse> getNoticesByCategory(NoticeCategory category);

  List<NoticeResponse> getUrgentNotices();

  // Ticker-related methods
  List<NoticeResponse> getTickerNotices();

  TickerSettingsResponse getTickerSettings();

  TickerSettingsResponse updateTickerSettings(TickerSettingsRequest request);
}
