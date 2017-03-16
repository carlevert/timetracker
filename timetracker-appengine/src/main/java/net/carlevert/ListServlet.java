package net.carlevert;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.googlecode.objectify.cmd.Query;

@SuppressWarnings("serial")
public class ListServlet extends HttpServlet {

	@Override
	protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException 
	{ 
	    resp.setHeader("Access-Control-Allow-Origin", "*");
	}

	@Override
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		OfyService.registerEntities();
	    response.setHeader("Access-Control-Allow-Origin", "*");
		ObjectMapper objectMapper = new ObjectMapper();
		
		boolean includeDeleted = request.getParameterMap().containsKey("includeDeleted") &&
				Boolean.parseBoolean(request.getParameter("includeDeleted")) == true;
	
		Query<Break> b = ofy().load().type(Break.class);
		
		if (!includeDeleted)
			b = b.filter("deleted", false);

		List<Break> breakList = b.list();
		String strBreak = objectMapper.writeValueAsString(breakList);
		response.setContentType("application/json");
		response.getWriter().println(strBreak);

	}
}
