package com.bpmn.payment_gateway;

import util.DatabaseConnector;

import org.camunda.bpm.engine.delegate.DelegateExecution;

public class NotifyDelegate {
	
	@Override
	public void execute(DelegateExecution execution) throw Exception{
		// TODO Auto-generated method stub
		
		Connection connection = DatabaseConnector.connect("payment_gateway");
        PreparedStatement preparedStatement;
            
        LOGGER.info("\n\n  ... Success payment " + "\n"
        		+ "Kode Pembayaran = " + execute.getVariable("kode pembayaran") + "\n"
        		+ ", Deskripsi = " + execute.getVariable("deksripsi") + "\n"
        		+ ", Jumlah Pembayaran = " + execute.getVariable("jumlah pembayaran")
        		+ " \n\n");
		
	}

}
