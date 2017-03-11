package net.carlevert;

import com.googlecode.objectify.ObjectifyService;

public class OfyService {

	public static boolean ENTITIES_REGISTERED = false;
	
	public static void registerEntities() {
		
		if (ENTITIES_REGISTERED)
			return;
		
		ObjectifyService.register(Break.class);
		
		ENTITIES_REGISTERED = true;
	}
	
}
