package com.bpmn.payment_gateway;

import util.DatabaseConnector;

import org.camunda.bpm.engine.delegate.DelegateExecution;

public class DoPaymentDelegate implements JavaDelegate {
	
	@Override
	public void execute(DelegateExecution execution) throw Exception{
		// TODO Auto-generated method stub
		
		Connection connection = DatabaseConnector.connect("payment_gateway");
        PreparedStatement preparedStatement;
        
        try {
        	
        	tipe = execute.getVariable("tipe");
        	jumlah_pembayaran = execute.getVariable("jumlah pembayaran");
        	deskripsi = execute.getVariable("deskripsi");

            Kode_pembayaran = tipe + Integer.toString(jumlah_pembayaran);
            String command = "INSERT INTO payment (tipe, deskripsi, jumlah_pembayaran, kode_pembayaran) VALUES (?,?,?,?)";
            preparedStatement = connection.prepareStatement(command);
            preparedStatement.setString(1, tipe);
            preparedStatement.setString(2, deskripsi);
            preparedStatement.setInt(3, jumlah_pembayaran);
            preparedStatement.setString(4, Kode_pembayaran);
            preparedStatement.executeUpdate();
            
            execution.setVariables("kode pembayaran", Kode_pembayaran);
            execution.setVariables("success", true);

        } catch (SQLException e) {
        	execution.setVariables("success", false);
            e.printStackTrace();
        }
        DatabaseConnector.close(connection);


		
	}
	

}
