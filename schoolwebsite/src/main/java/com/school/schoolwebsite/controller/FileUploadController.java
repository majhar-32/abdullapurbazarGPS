package com.school.schoolwebsite.controller;

import com.school.schoolwebsite.service.FileStorageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/upload")
public class FileUploadController {

  private final FileStorageService fileStorageService;

  public FileUploadController(FileStorageService fileStorageService) {
    this.fileStorageService = fileStorageService;
  }

  @PostMapping
  public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile file) {
    String fileName = fileStorageService.storeFile(file);

    String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
        .path("/uploads/")
        .path(fileName)
        .toUriString();

    Map<String, String> response = new HashMap<>();
    response.put("fileName", fileName);
    response.put("fileUrl", fileDownloadUri);

    return ResponseEntity.ok(response);
  }
}
