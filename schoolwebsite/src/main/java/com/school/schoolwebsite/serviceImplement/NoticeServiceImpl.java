package com.school.schoolwebsite.serviceImplement;

import com.school.schoolwebsite.dto.request.NoticeRequest;
import com.school.schoolwebsite.dto.request.TickerSettingsRequest;
import com.school.schoolwebsite.dto.response.NoticeResponse;
import com.school.schoolwebsite.dto.response.TickerSettingsResponse;
import com.school.schoolwebsite.entity.Notice;
import com.school.schoolwebsite.entity.TickerSettings;
import com.school.schoolwebsite.entity.User;
import com.school.schoolwebsite.enums.NoticeCategory;
import com.school.schoolwebsite.repository.NoticeRepository;
import com.school.schoolwebsite.repository.TickerSettingsRepository;
import com.school.schoolwebsite.repository.UserRepository;
import com.school.schoolwebsite.service.NoticeService;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NoticeServiceImpl implements NoticeService {

  private final NoticeRepository noticeRepository;
  private final UserRepository userRepository;
  private final TickerSettingsRepository tickerSettingsRepository;

  public NoticeServiceImpl(NoticeRepository noticeRepository, UserRepository userRepository,
      TickerSettingsRepository tickerSettingsRepository) {
    this.noticeRepository = noticeRepository;
    this.userRepository = userRepository;
    this.tickerSettingsRepository = tickerSettingsRepository;
  }

  @Override
  @Transactional
  public NoticeResponse createNotice(NoticeRequest request, String username) {
    User user = userRepository.findByUsername(username)
        .orElseThrow(() -> new RuntimeException("User not found"));

    Notice notice = new Notice();
    notice.setTitle(request.getTitle());
    notice.setDescription(request.getDescription());
    notice.setCategory(request.getCategory());
    notice.setPublishDate(request.getPublishDate());
    notice.setIsUrgent(request.getIsUrgent());
    notice.setCreatedBy(user);
    notice.setAttachmentUrl(request.getAttachmentUrl());
    notice.setShowInTicker(request.getShowInTicker() != null ? request.getShowInTicker() : false);

    Notice savedNotice = noticeRepository.save(notice);
    return mapToResponse(savedNotice);
  }

  @Override
  @Transactional
  public NoticeResponse updateNotice(Long id, NoticeRequest request) {
    Notice notice = noticeRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Notice not found"));

    notice.setTitle(request.getTitle());
    notice.setDescription(request.getDescription());
    notice.setCategory(request.getCategory());
    notice.setPublishDate(request.getPublishDate());
    notice.setIsUrgent(request.getIsUrgent());
    notice.setAttachmentUrl(request.getAttachmentUrl());
    notice.setShowInTicker(request.getShowInTicker() != null ? request.getShowInTicker() : false);

    Notice updatedNotice = noticeRepository.save(notice);
    return mapToResponse(updatedNotice);
  }

  @Override
  @Transactional
  public void deleteNotice(Long id) {
    if (!noticeRepository.existsById(id)) {
      throw new RuntimeException("Notice not found");
    }
    noticeRepository.deleteById(id);
  }

  @Override
  public NoticeResponse getNoticeById(Long id) {
    Notice notice = noticeRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Notice not found"));
    return mapToResponse(notice);
  }

  @Override
  public List<NoticeResponse> getAllNotices() {
    return noticeRepository.findAllByOrderByPublishDateDesc()
        .stream()
        .map(this::mapToResponse)
        .collect(Collectors.toList());
  }

  @Override
  public List<NoticeResponse> getNoticesByCategory(NoticeCategory category) {
    return noticeRepository.findByCategory(category)
        .stream()
        .map(this::mapToResponse)
        .collect(Collectors.toList());
  }

  @Override
  public List<NoticeResponse> getUrgentNotices() {
    return noticeRepository.findByIsUrgentTrue()
        .stream()
        .map(this::mapToResponse)
        .collect(Collectors.toList());
  }

  private NoticeResponse mapToResponse(Notice notice) {
    NoticeResponse response = new NoticeResponse();
    response.setId(notice.getId());
    response.setTitle(notice.getTitle());
    response.setDescription(notice.getDescription());
    response.setCategory(notice.getCategory());
    response.setPublishDate(notice.getPublishDate());
    response.setIsUrgent(notice.getIsUrgent());
    response.setCreatedBy(notice.getCreatedBy() != null ? notice.getCreatedBy().getUsername() : null);
    response.setCreatedAt(notice.getCreatedAt());
    response.setUpdatedAt(notice.getUpdatedAt());
    response.setAttachmentUrl(notice.getAttachmentUrl());
    response.setShowInTicker(notice.getShowInTicker());
    return response;
  }

  // Ticker-related methods
  @Override
  public List<NoticeResponse> getTickerNotices() {
    TickerSettings settings = getTickerSettingsEntity();

    if (!settings.getEnabled()) {
      return List.of();
    }

    PageRequest pageRequest = PageRequest.of(0, settings.getMaxItems());
    return noticeRepository.findByShowInTickerTrueOrderByPublishDateDesc(pageRequest)
        .stream()
        .map(this::mapToResponse)
        .collect(Collectors.toList());
  }

  @Override
  public TickerSettingsResponse getTickerSettings() {
    TickerSettings settings = getTickerSettingsEntity();
    return mapToTickerSettingsResponse(settings);
  }

  @Override
  @Transactional
  public TickerSettingsResponse updateTickerSettings(TickerSettingsRequest request) {
    TickerSettings settings = tickerSettingsRepository.findAll()
        .stream()
        .findFirst()
        .orElseGet(() -> new TickerSettings());

    settings.setScrollSpeed(request.getScrollSpeed());
    settings.setMaxItems(request.getMaxItems());
    settings.setEnabled(request.getEnabled());

    TickerSettings updatedSettings = tickerSettingsRepository.save(settings);
    return mapToTickerSettingsResponse(updatedSettings);
  }

  private TickerSettings getTickerSettingsEntity() {
    return tickerSettingsRepository.findAll()
        .stream()
        .findFirst()
        .orElseGet(() -> {
          TickerSettings defaultSettings = new TickerSettings();
          defaultSettings.setScrollSpeed("MEDIUM");
          defaultSettings.setMaxItems(10);
          defaultSettings.setEnabled(true);
          return tickerSettingsRepository.save(defaultSettings);
        });
  }

  private TickerSettingsResponse mapToTickerSettingsResponse(TickerSettings settings) {
    return new TickerSettingsResponse(
        settings.getId(),
        settings.getScrollSpeed(),
        settings.getMaxItems(),
        settings.getEnabled());
  }
}
