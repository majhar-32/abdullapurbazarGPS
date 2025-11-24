package com.school.schoolwebsite.repository;

import com.school.schoolwebsite.entity.Notice;
import com.school.schoolwebsite.enums.NoticeCategory;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {
  List<Notice> findByCategory(NoticeCategory category);

  List<Notice> findByIsUrgentTrue();

  List<Notice> findAllByOrderByPublishDateDesc();

  List<Notice> findByShowInTickerTrueOrderByPublishDateDesc(Pageable pageable);
}
