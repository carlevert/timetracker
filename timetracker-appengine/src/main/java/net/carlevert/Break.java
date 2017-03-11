package net.carlevert;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;
import com.googlecode.objectify.annotation.OnSave;

@JsonIgnoreProperties(ignoreUnknown=true)
@Entity
public class Break {
	
	@Id
	public Long id;
	
	@Index
	public String userId;
	
	public Date from;
	
	@Index
	public Date to;
	
	@Index
	public boolean deleted;
	
	public int adjustment;
	
	public String note;
	
	public Date createdAt;
	
	public Date updatedAt;
	
	@OnSave
	private void updateTimestamps() {
		if (this.createdAt == null) 
			this.createdAt = new Date();
		this.updatedAt = new Date();
	}
	
	public Break(Long id) {
		this.id = id;
	}
	public Break() {
	}

}
