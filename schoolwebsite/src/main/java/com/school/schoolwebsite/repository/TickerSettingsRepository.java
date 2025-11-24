package com.school.schoolwebsite.repository;

import com.school.schoolwebsite.entity.TickerSettings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TickerSettingsRepository extends JpaRepository<TickerSettings, Long> {
}
