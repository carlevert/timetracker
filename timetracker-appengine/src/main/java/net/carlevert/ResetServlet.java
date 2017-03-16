package net.carlevert;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.googlecode.objectify.Key;
import static com.googlecode.objectify.ObjectifyService.ofy;

@SuppressWarnings("serial")
public class ResetServlet extends HttpServlet {

	@Override
	protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException 
	{ 
	    resp.setHeader("Access-Control-Allow-Origin", "*");
	}

	
	@Override
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		OfyService.registerEntities();
		
		List<Key<Break>> keys = ofy().load().type(Break.class).keys().list();
		ofy().delete().keys(keys);
		
		response.setContentType("application/json");
		response.getWriter().println("{ \"message\": \"OK\" }");

	}
}

